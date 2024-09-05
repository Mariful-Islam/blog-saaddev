import React, { useContext, useState } from "react";
import { QuillEditor, Select } from "../../utils";
import useApi from "../../utils/api";
import { PostsContext } from "../../context/postsContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SEO from "./SEO";
import { AuthContext } from "../../context/AuthContext";

export interface FormDataType {
  username: string;
  title: string;
  description: string;
  tag: string[];
  meta_title: string;
  meta_description: string;
  slug: string;
}

const PostCreateMain = () => {
  const authContext = useContext(AuthContext)
  const username = Cookies.get("username") 
  const [formData, setFormData] = useState<FormDataType>({ username: username });

  const [response, setResponse] = useState("");
  const api = useApi();
  const { getPosts }: any = useContext(PostsContext);
  const navigate = useNavigate();
  

  const onChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createPost = async (e: any) => {
    e.preventDefault()
    console.log(formData)

    if (formData) {
      await api
        .createPost(formData)
        .then((response) => {
          console.log(response);
          if (response) {
            setResponse(response.data);
          }
        })
        .catch((error) => console.log(error));
      setFormData({});
      e.target.reset();
      getPosts();
      navigate("/");
    } else {
      console.log("Form is empty ");
      alert("Form is empty");
    }
  };

  return (
    <>
      <div className="px-4 md:px-[10%]">
        <form className="pt-10 " onSubmit={createPost}>
          {response.length === 0 ? (
            <>
              <div className="border rounded-md shadow-md p-4 mb-4">
                {!authContext.authenticated ? (
                  <input
                    type="email"
                    name="email"
                    value={formData?.username}
                    onChange={onChange}
                    placeholder="Email"
                    className="border-gray-300 w-full rounded-md mb-4"
                    required
                  />
                ) : (
                  <></>
                )}
                <input
                  type="text"
                  name="title"
                  value={formData?.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                    onChange(e)
                    const slug = e.target.value.toLowerCase().split(" ").join("-")
                    setFormData((prev:FormDataType|any)=>({...prev, slug: slug}))
                  }}
                  placeholder="Title"
                  className="border-gray-300 w-full rounded-md mb-4"
                  required
                />

                <QuillEditor
                value={formData?.description || ""}
                onChange={(e)=>setFormData((prev:any)=>({...prev, description: e}))}
                className="rounded-md mb-4"
              />

                <Select formData={formData} setFormData={setFormData} />
              </div>

              <SEO formData={formData} onChange={onChange} />

              <button
                type="submit"
                className="px-6 py-2 mt-4 bg-blue-600 hover:bg text-white text-md rounded-md float-right hover:bg-blue-700"
              >
                Post
              </button>
            </>
          ) : (
            <div>{response}</div>
          )}
        </form>
      </div>
    </>
  );
};

export default PostCreateMain;
