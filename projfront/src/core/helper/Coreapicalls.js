import { API } from "../../backend";

const getallproduct = () => {
    return fetch(`${API}/product`, { method: "GET" })
        .then(res => {
        return res.json()
        })
    .catch(err=>console.log(err))
}
export default getallproduct;