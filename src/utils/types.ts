export type ActivityType = 'run' | 'ride'

export type CreateActivitiesParams = {
    startTime: string,
    finishTime: string,
    activityDistance: number,
    activityType: ActivityType
}