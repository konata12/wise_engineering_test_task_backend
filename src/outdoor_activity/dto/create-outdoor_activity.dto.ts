import { IsEnum, Length, Min } from "class-validator"
import { ActivityType } from "src/utils/types"

export class CreateOutdoorActivityDto {
    @Length(5, 5)
    startTime: string

    @Length(5, 5)
    finishTime: string

    @Min(0)
    activityDistance: number

    @IsEnum(
        ['run', 'ride'],
        { message: "Use correct activity type" }
    )
    activityType: ActivityType
}
