import { Canister, query, update, Void, text, Record, Principal, bool } from 'azle';

const User = Record({
    id: Principal,
    role: text, // Author | Editor | Admin
    username: text, 
    email: text
});

const Article = Record({ 
    author: User, // owner
    content: text
});

const ContentDB = Record({
    article: Article, 
    // author: -- optimization
    published: bool, 
});

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

export default Canister({
    // init
    // setAdmin

    // createArticle
    // updateArticle
    
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