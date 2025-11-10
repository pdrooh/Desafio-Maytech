import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    // Verificar se email já existe
    const existingEmail = await this.prisma.client.findUnique({
      where: { email: createClientDto.email },
    });
    if (existingEmail) {
      throw new ConflictException('Email já cadastrado');
    }

    // Verificar se CPF já existe
    const existingCpf = await this.prisma.client.findUnique({
      where: { cpf: createClientDto.cpf },
    });
    if (existingCpf) {
      throw new ConflictException('CPF já cadastrado');
    }

    const client = await this.prisma.client.create({
      data: createClientDto,
    });

    return client;
  }

  async findAll() {
    return this.prisma.client.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    // Verificar se cliente existe
    await this.findOne(id);

    // Verificar conflitos de email (se fornecido)
    if (updateClientDto.email) {
      const existingEmail = await this.prisma.client.findFirst({
        where: {
          email: updateClientDto.email,
          NOT: { id },
        },
      });
      if (existingEmail) {
        throw new ConflictException('Email já cadastrado');
      }
    }

    // Verificar conflitos de CPF (se fornecido)
    if (updateClientDto.cpf) {
      const existingCpf = await this.prisma.client.findFirst({
        where: {
          cpf: updateClientDto.cpf,
          NOT: { id },
        },
      });
      if (existingCpf) {
        throw new ConflictException('CPF já cadastrado');
      }
    }

    return this.prisma.client.update({
      where: { id },
      data: updateClientDto,
    });
  }

  async remove(id: string) {
    // Verificar se cliente existe
    await this.findOne(id);

    await this.prisma.client.delete({
      where: { id },
    });

    return { message: 'Cliente removido com sucesso' };
  }
}
