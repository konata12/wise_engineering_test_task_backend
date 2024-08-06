export class CreateOutdoorActivityDto {
    date: Date
    startTime: string
    finishTime: string
    distance: number
    activityType: 'run' | 'ride'
}
