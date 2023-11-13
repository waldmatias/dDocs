import { Canister, query, update, Void, text } from 'azle';
import { initApp, isAdmin, getCurrentAdmin, transferAdmin, registerUser } from './dDocs';

// v.1
// type doc-item: Article(Blob) { item-type: text | mime-type, owner, published }
// section -> contains -> section (recurse)
// type user: User(Principal) { Role: Author | Editor }
//  role: author | editor
// author:
//  add (doc-item) state=DRAFT, remove(doc-item)
//  doc-item has owner author, TODO: author can transfer to another author
// editor
//  authorize (author) add|remove doc-item, publish (doc-item) state=PUBLISHED
// v.2
// type doc-item-change
//  propose_changes(doc-item) -- merging?
// process urls: transform url links to canister call getArticle()

export default Canister({
    // dDocs init
    initApp, 
    isAdmin, 
    getCurrentAdmin,
    transferAdmin, 

    /* User Management */ 
    registerUser, 
    /* Article Management */
    // fetchArticle
    // updateArticle (if no id, then createArticle)
});