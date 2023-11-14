import { Canister } from 'azle';
import { initApp, isAdmin, getKeys, getValues, getContentDBAt, transferAdmin, registerUser, fetchArticles } from './dDocs';

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
    transferAdmin, 

    /* User Management */ 
    registerUser, 
    /* Article Management */
    // fetchArticle
    fetchArticles,
    // updateArticle (if no id, then createArticle)

    /* test */
    getKeys,
    getValues, 
    getContentDBAt, 
});