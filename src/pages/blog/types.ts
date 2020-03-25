export interface IArticleData{
    id:number,
    title: string,
    introduce?: string,
    user: IUserData,
    blog_type: {
        typename:string,
    },
    likeCount ?: number,
    messageCount ?:number,
}

export interface IUserData{
    username: string;
    disc: string;
    user_icon: string;
    id:number
}

export interface ICommentData{
    id:string,
    title: string,
    user: IUserData,
      blog_type: {
        typename:string,
    },
    comment:string
}
export interface IFav{
    id:string,
    favName: string,
    count:string
}