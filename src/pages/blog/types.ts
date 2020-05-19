export interface IArticleData{
    id:number,
    title: string,
    introduce?: string,
    user: IUserData,
    blog_type: {
        typename:string,
    },
    likeCount?: number,
    messageCount?: number,
    article_content?: string,
    isFav?: boolean,
    isLike?: boolean,
}

export interface IUserData{
    username: string;
    disc: string;
    user_icon: string;
    id: number;
    article_count?: number;
}

export interface ICommentData{
    id:string,
    blog_article: IArticleData,
    user: IUserData,
    comment_content:string
}
export interface IFav{
    fav_id:string,
    fav_name: string,
    articles_favorites:Array<any>
}

export interface ILogin {
    userInfo?: ILoginInfo;
    onLogin: (userInfo: ILoginInfo) => void;
    onLogout: () => void;

}

export interface IComment{
    comment_id: number;
    comment_content: string;
    createdAt: string;
    user: IUserData;
    comments_to_comments: Array<IComment>;
}

export interface ILoginInfo {
    userId: number;
    userIcon: string;
    username: string;
}
