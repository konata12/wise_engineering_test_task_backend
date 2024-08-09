import { ActivityType } from "src/utils/types";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'activities' })
export class Activity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'timestamp' })
    date: Date

    @Column()
    startTime: string

    @Column()
    finishTime: string

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 1
    })
    activityDistance: number

    @Column()
    activityType: ActivityType
}