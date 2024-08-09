export type ActivityType = 'run' | 'ride'

export type Month = 'January' | 'February' | 'March'
    | 'April' | 'May' | 'June'
    | 'July' | 'August' | 'September'
    | 'October' | 'November' | 'December';

export type ParsedDate = {
    month: Month,
    day: number
}

export type ParsedTime = {
    hours: number,
    minutes: number
}

export type CreateActivitiesParams = {
    startTime: string,
    finishTime: string,
    activityDistance: number,
    activityType: ActivityType
}

export type ParseActivityToResponse = {
    id: number,
    date: Date,
    startTime: string,
    finishTime: string,
    activityDistance: number,
    activityType: ActivityType
}

export type ParsedActivity = {
    date: ParsedDate,
    activityType: ActivityType,
    distance: number,
    time: ParsedTime,
    speed: number
}