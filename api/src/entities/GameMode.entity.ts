import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('mode')
class GameMode {
    @PrimaryGeneratedColumn({ name: "mode_id" })
    id: number;

    @Column({ nullable: false, unique: true })
    name: string;
}

export default GameMode;