import { Canister, query, update, Void, text } from 'azle';


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
    // init: set caller() to admin. Allow transfer to other admin? 
    // transferAdmin (only current admin can change/transfer to other user)

    // Article Management
    // getArticle
    // createArticle
    // updateArticle
    
    // User Management
    // registerUser
    getAuthor: query([text], text, (author) => {
        return author;
    }),


    /*  
    // Query calls complete quickly because they do not go through consensus
    getMessage: query([], text, () => {
        return message;
    }),
    // Update calls take a few seconds to complete
    // This is because they persist state changes and go through consensus
    setMessage: update([text], Void, (newMessage) => {
        message = newMessage; // This change will be persisted
    })
    */
});