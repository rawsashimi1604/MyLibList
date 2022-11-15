export default function validateUser(userData){
    if (typeof userData !== "string") return false;

    return true;
}