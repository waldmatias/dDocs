import { Principal, Record, Variant, text, Null, update, bool, Void, StableBTreeMap } from "azle";

export const UserRole = Variant({
    Admin: Null, 
    Viewer: Null, 
    Author: Null, 
    Editor: Null,
});

export const User = Record({
    id: Principal, // test -> Principal.fromUint8Array(Uint8Array.from([0])),
    role: UserRole, // Viewer, Author | Editor | Admin
    username: text, 
    email: text
});

export const Article = Record({ 
    author: User, // owner
    content: text
});

export const ArticleStatus = Variant({
    Draft: Null, 
    Published: Null, 
});


export const ContentDB = Record({
    article: Article, 
    // author: -- optimization
    status: ArticleStatus, 
});

export const AccessControlPermission = Variant({
    View: Null, 
    Edit: Null, 
    Delete: Null, 
});

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
let dDocsApp = StableBTreeMap(Principal, ContentDB, 0);
// dDocs API exposed via canister
//export const dDocs = StableBTreeMap()


/* Init */
export const init = update([Principal], Void, (principal) => {
    
});

export const transferAdmin = update([Principal], Void, (principal) => {
    // check caller is current admin
});


/* User Management */
export const registerUser = update([Principal, text, text], bool, (principal, username, email) => {
    return true; 
});

export const approveUser = () => {}; // only admin
export const revokeUser = () => {}; // only admin

// article management
// article management: publishing flow