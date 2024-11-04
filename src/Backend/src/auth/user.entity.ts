import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({
    name: 'user_id',
  })
  id: number;

  @Column()
  username: string;

  @Column({
    name: 'password_hash',
  })
  password: string;

  @Column()
  email: string;

  constructor(username: string, password: string, email: string) {
    this.username = username;
    this.password = password;
    this.email = email;
  }
}
