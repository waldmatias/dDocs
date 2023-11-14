import { 
    ic, query, update, 
    Principal, Record, Variant, text, Null, bool, Void,
    StableBTreeMap, nat64, Vec, Tuple, 
} from "azle";

export const UserRole = Variant({
    Viewer: Null, 
    Author: Null, // +Viewer 
    Editor: Null, // +Author
    Admin: Null,  // +Editor
});
export type UserRoleKind = typeof UserRole;

export const User = Record({
    id: Principal, // test -> Principal.fromUint8Array(Uint8Array.from([0])),
    role: UserRole, // Viewer | Author | Editor | Admin
    username: text, 
    email: text
});

export const ArticleStatus = Variant({
    Draft: Null, 
    Published: Null, 
});
export type ArticleStatusKind = typeof ArticleStatus;

export const Article = Record({ 
    author: User, // owner
    content: text, 
    status: ArticleStatus,
});

export const ContentDB = Record({
    createdAt: nat64, 
    dbName: text, 
    users: Vec(User),
    articles: Vec(Article),
});

export const AccessControlPermission = Variant({
    View: Null, 
    Edit: Null, // +View
    Delete: Null, // +Edit
});
export type AccessControlPermissionKind = typeof AccessControlPermission;

export const AccessControl = Record({
    user: User, 
    permission: AccessControlPermission, // View (default) | Edit | Delete
});


/**
 * 
 * dDocs App 
 * 
 **/

// dDocs (appAdmin, appDB)
const MEM_IDX_CONTENTDB = 0;
let dDocsApp = StableBTreeMap(User, ContentDB, MEM_IDX_CONTENTDB);

// const MEM_IDX_CONTENTDB_ARTICLES = 1;
// let articles = StableBTreeMap(Principal, Vec(Article), MEM_IDX_CONTENTDB_ARTICLES)

// dDocs API exposed via canister
//export const dDocs = StableBTreeMap()

/* Init + App Management */
export const initApp = update([text], Void, (dbName) => {
    let admin: typeof User = {
        id: ic.caller(), 
        role: { Admin: null }, 
        username: "admin", 
        email: "admin@dDocs",
    };

    const dDocsDB: typeof ContentDB = {
        createdAt: ic.time(),
        dbName: dbName, 
        users: [],
        articles: [],
    };

    dDocsApp.insert(admin, dDocsDB)
});

export const getKeys = query([], Vec(User), () => {
    return dDocsApp.keys();
});

export const isAdmin = query([], bool, () => {
    return dDocsApp.containsKey({ id: ic.caller() });
});

export const transferAdmin = update([Principal], Void, (principal) => {
    // check caller is current admin
    dDocsApp.get(principal)
});


/* User Management */
export const registerUser = update([text, text], Void, (username, email) => {
    const newUser: typeof User = {
        id: ic.caller(), 
        username: username, 
        email: email, 
    };

    dDocsApp[MEM_IDX_CONTENTDB].users.push(newUser);
});

export const approveUser = () => {}; // only admin
export const revokeUser = () => {}; // only admin

// article management
export const fetchArticles = query([], Vec(Article), () => {
    // let's allow only the admin to get everything right now, for testing
    const contentDB = dDocsApp.get(ic.caller());

    return contentDB.Articles.values();    
});
// article management: publishing flow