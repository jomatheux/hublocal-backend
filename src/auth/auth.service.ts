import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async register(registerDto: RegisterDto) {
        if (registerDto.password !== registerDto.confirmPassword) {
            throw new UnauthorizedException('As senhas não coincidem');
        }
        if (!registerDto.name || !registerDto.email || !registerDto.password) {
            throw new UnauthorizedException('Todos os campos são obrigatórios');
        }
        const existingUser = await this.prisma.user.findUnique({ where: { email: registerDto.email } });
        if (existingUser) {
            throw new UnauthorizedException('Email já cadastrado');
        }
        if (registerDto.password.length < 6) {
            throw new UnauthorizedException('A senha deve ter pelo menos 6 caracteres');
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = await this.prisma.user.create({
            data: { name: registerDto.name, email: registerDto.email, password: hashedPassword },
        });
        return { user, message: 'Cadastro realizado com sucesso' };
    }

    async login(loginDto: LoginDto) {
        const user = await this.prisma.user.findUnique({ where: { email: loginDto.email } });
        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
            throw new UnauthorizedException('Credenciais inválidas');
        }
        user.password = "";
        const token = this.jwtService.sign({ userId: user.id });
        return { token, message: 'Login realizado com sucesso', user };
    }
}