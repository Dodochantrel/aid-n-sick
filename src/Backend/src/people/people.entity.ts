import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('missingpersons')
export class People {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    name: 'photo_url',
  })
  photoUrl: string;

  @Column()
  age: number;

  @Column()
  height: number;

  @Column({
    name: 'last_seen_date',
  })
  lastSeenDate: Date;

  @Column()
  descripion: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  constructor(
    name: string,
    photoUrl: string,
    age: number,
    height: number,
    lastSeenDate: Date,
    descripion: string,
    latitude: number,
    longitude: number,
  ) {
    this.name = name;
    this.photoUrl = photoUrl;
    this.age = age;
    this.height = height;
    this.lastSeenDate = lastSeenDate;
    this.descripion = descripion;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
