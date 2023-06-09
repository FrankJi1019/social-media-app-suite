
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateAccountInput {
    username?: Nullable<string>;
}

export interface CreateCategoryInput {
    name: string;
}

export interface CreateChatMessageInput {
    senderId: string;
    receivedId: string;
    content: string;
}

export interface FetchChatHistoryInput {
    accountNames?: Nullable<string[]>;
}

export interface CreateCommentInput {
    username: string;
    character: string;
    content: string;
    momentId: string;
}

export interface QueryCommentInput {
    momentId: string;
}

export interface FetchFriendshipInput {
    userAccountName: string;
    friendAccountName: string;
}

export interface FindOrCreateFriendshipInput {
    userAccountName: string;
    friendAccountName: string;
}

export interface CreateMomentInput {
    username: string;
    character: string;
    content: string;
    tags: string[];
}

export interface LikeAndUnlikeMomentInput {
    momentId: string;
    username: string;
}

export interface FilterMomentInput {
    category?: Nullable<string>;
    followedBy?: Nullable<string>;
}

export interface ReportMomentInput {
    momentId: string;
    reporterUsername: string;
    reason: string;
}

export interface CreateTagInput {
    name: string;
    category?: Nullable<string>;
}

export interface Account {
    id?: Nullable<string>;
    username?: Nullable<string>;
    createdAt?: Nullable<string>;
    friends?: Nullable<Friendship[]>;
    profileImage: string;
}

export interface Category {
    id: string;
    name: string;
    tags?: Nullable<Tag[]>;
}

export interface Character {
    id: string;
    name: string;
}

export interface Chat {
    id: string;
    sender: Account;
    receiver: Account;
    content: string;
    createdAt: string;
}

export interface Comment {
    id: string;
    account: Account;
    content: string;
    createdAt: string;
    character: Character;
    moment: Moment;
}

export interface Friendship {
    id: string;
    hasUnread: boolean;
    userAccount: Account;
    userCharacter: Character;
    friendAccount: Account;
    friendCharacter: Character;
}

export interface Moment {
    id: string;
    character: Character;
    content: string;
    createdAt: string;
    likeNumber: number;
    commentNumber: number;
    isLiked: boolean;
    comments?: Nullable<Comment[]>;
    tags: Tag[];
    account: Account;
    images: string[];
}

export interface Report {
    id: string;
    moment: Moment;
    reporter: Account;
    reason: string;
    createdAt: string;
}

export interface IQuery {
    moments(input?: Nullable<FilterMomentInput>): Nullable<Moment[]> | Promise<Nullable<Moment[]>>;
    moment(id: string): Moment | Promise<Moment>;
    comments(input: QueryCommentInput): Comment[] | Promise<Comment[]>;
    characters(): Nullable<Character[]> | Promise<Nullable<Character[]>>;
    categories(): Nullable<Category[]> | Promise<Nullable<Category[]>>;
    tags(): Nullable<Tag[]> | Promise<Nullable<Tag[]>>;
    account(username: string): Account | Promise<Account>;
    chats(input: FetchChatHistoryInput): Nullable<Chat[]> | Promise<Nullable<Chat[]>>;
    friendship(id: string): Friendship | Promise<Friendship>;
}

export interface IMutation {
    createMoment(input: CreateMomentInput): Moment | Promise<Moment>;
    deleteMoment(id: string): boolean | Promise<boolean>;
    createCharacter(name: string): Nullable<Character> | Promise<Nullable<Character>>;
    likeMoment(input: LikeAndUnlikeMomentInput): Moment | Promise<Moment>;
    unlikeMoment(input: LikeAndUnlikeMomentInput): Moment | Promise<Moment>;
    createComment(input: CreateCommentInput): Comment | Promise<Comment>;
    createCategory(input: CreateCategoryInput): Category | Promise<Category>;
    createTag(input: CreateTagInput): Tag | Promise<Tag>;
    createAccount(input: CreateAccountInput): Account | Promise<Account>;
    createChat(input: CreateChatMessageInput): Chat | Promise<Chat>;
    findOrCreateFriendship(input: FindOrCreateFriendshipInput): Friendship | Promise<Friendship>;
    reportMoment(input: ReportMomentInput): Report | Promise<Report>;
}

export interface Tag {
    id: string;
    name: string;
    category?: Nullable<Category>;
}

type Nullable<T> = T | null;
