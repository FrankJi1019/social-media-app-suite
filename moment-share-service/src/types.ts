
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

export interface CreateCommentInput {
    username: string;
    character: string;
    content: string;
    momentId: string;
}

export interface CreateFriendshipInput {
    account1Username: string;
    account2Username: string;
    account1Character: string;
    account2Character: string;
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

export interface CreateTagInput {
    name: string;
    category?: Nullable<string>;
}

export interface Account {
    id?: Nullable<string>;
    username?: Nullable<string>;
    createdAt?: Nullable<string>;
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

export interface Comment {
    id: string;
    account: Account;
    content: string;
    createdAt: string;
    character: Character;
    moment: Moment;
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
}

export interface IQuery {
    moments(input?: Nullable<FilterMomentInput>): Nullable<Moment[]> | Promise<Nullable<Moment[]>>;
    moment(id: string): Moment | Promise<Moment>;
    characters(): Nullable<Character[]> | Promise<Nullable<Character[]>>;
    categories(): Nullable<Category[]> | Promise<Nullable<Category[]>>;
    tags(): Nullable<Tag[]> | Promise<Nullable<Tag[]>>;
    account(username: string): Account | Promise<Account>;
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
    createFriendship(input: CreateFriendshipInput): boolean | Promise<boolean>;
}

export interface Tag {
    id: string;
    name: string;
    category?: Nullable<Category>;
}

type Nullable<T> = T | null;
