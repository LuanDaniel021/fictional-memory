import { Entity } from 'typeorm';

@Entity()
export class Crlv {
  uf: string;
  crv: string;
  tipo: string;
  marca: string;
  placa: string;
  chassi: string;
  modelo: string;
  especie: string;
  renavam: string;
  exercicio: number;
  ano_modelo: number;
  ano_fabricacao: number;
}