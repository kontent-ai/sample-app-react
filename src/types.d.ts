export type ChangeFeedItem = {
    project_id: string,
    codename: string,
    id: string,
    content_type: string,
    timestamp: Date,
    language: string,
    collection: string,
    change_type: "delete" | "updated"
}