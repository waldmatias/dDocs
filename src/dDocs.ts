import { Principal, Record, Variant, text, Null } from "azle";

const User = Record({
    id: Principal, // test -> Principal.fromUint8Array(Uint8Array.from([0])),
    role: text, // Author | Editor | Admin
    username: text, 
    email: text
});

const Article = Record({ 
    author: User, // owner
    content: text
});

const ArticleStatus = Variant({
    Draft: Null, 
    Published: Null, 
});

const ContentDB = Record({
    article: Article, 
    // author: -- optimization
    status: ArticleStatus, 
});

const AccessControlPermission = Variant({
    View: Null, 
    Edit: Null, 
    Delete: Null, 
})
const AccessControl = Record({
    user: User, 
    permission: AccessControlPermission, // View (default) | Edit | Delete
});