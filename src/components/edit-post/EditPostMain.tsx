import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { PostsContext } from "../../context/postsContext";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../../utils/api";
import { toast } from "react-toastify";
import { QuillEditor, Select } from "../../utils";
import SEO from "../post-create/SEO";

function EditPostMain() {
  const navigate = useNavigate();
  const { slug }:any = useParams()
  const authContext = useContext(AuthContext)
  const [formData, setFormData] = useState<any>();
  const [response, setResponse] = useState("");
  const api = useApi();
  const { getPosts }: any = useContext(PostsContext);


  const onChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(()=>{
    fetchPost()
  }, [])

  const fetchPost = () => {
    api.getPost(slug).then((response)=>{
      setFormData(response.data)
    }).catch((error)=>{
      toast.error("Error fetch post")
      console.log(error)
    })
  }

  const createPost = async (e: any) => {
    e.preventDefault()
    
    if (!formData.title){
      toast.warn('Title is empty')
    }
    if (!formData.description){
      toast.error('description is empty')
    }
    if (!formData.tag){
      toast.error('tag is empty')
    }
    if (!formData.meta_title){
      toast.error( 'meta_title is empty')
    }
    if (!formData.meta_description){
      toast.error('meta_description is empty')
    }
    if (!formData.slug){
      toast.error('slug is empty')
    }

    if (formData) {
      await api
        .editPost(slug, formData)
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
                    type="text"
                    name="username"
                    value={formData?.username || ""}
                    onChange={onChange}
                    placeholder="Email"
                    className="border-gray-300 w-full rounded-md mb-4 hidden"
                  />
                ) : (
                  <></>
                )}
                <input
                  type="text"
                  name="title"
                  value={formData?.title || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange(e);
                    const slug = e.target.value
                      .toLowerCase()
                      .split(" ")
                      .join("-");
                    setFormData((prev: any) => ({ ...prev, slug: slug }));
                    setFormData((prev: any) => ({ ...prev, meta_title: slug }));
                  }}
                  placeholder="Title"
                  className="border-gray-300 w-full rounded-md mb-4"
                />

                <QuillEditor
                  value={formData?.description || ""}
                  onChange={(e) =>
                    setFormData((prev: any) => ({ ...prev, description: e }))
                  }
                  className="rounded-md mb-4"
                />

                <Select formData={formData} setFormData={setFormData} />
              </div>

              <SEO formData={formData} onChange={onChange} />

              <button
                type="submit"
                className="px-6 py-2 mt-4 bg-blue-600 hover:bg text-white text-md rounded-md float-right hover:bg-blue-700 transition-all duration-150 ease-linear"
              >
                Update
              </button>
            </>
          ) : (
            <div>{response}</div>
          )}
        </form>
      </div>
    </>
  );
}

export default EditPostMain;
