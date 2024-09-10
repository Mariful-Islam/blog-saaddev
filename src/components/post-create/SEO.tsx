import React from "react";
import { Helmet } from "react-helmet-async";

// interface SEODataType {
//   meta_title: string;
//   meta_description: string;
//   slug: string;
// }

interface SEOType {
  formData: any;
  onChange: (e: any) => void;
}

function SEO({ formData, onChange }: SEOType) {
  return (
    <>
      <Helmet>
        <title>Write Blog </title>
        <meta
          name="description"
          content="Write blog based on your skill not with chatgpt"
        />
        <link rel="canonical" href="/create_post" />
      </Helmet>
      <div className="border rounded-md shadow-md p-4">
        <div className="mb-4">
          <strong className="text-blue-800 font-semibold text-lg ">
            {formData?.meta_title}
          </strong>
          <p className="text-sm text-green-500 m-0 p-0">
            https://{window.location.host}/post/{formData?.slug}
          </p>
          <p className="text-gray-500 m-0 p-0">{formData?.meta_description}</p>
        </div>
        <input
          type="text"
          placeholder="Meta Title"
          name="meta_title"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
          value={formData?.meta_title || ""}
          className="border-gray-300 w-full rounded-md mb-4"
        />
        <input
          type="text"
          placeholder="Meta Description"
          name="meta_description"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
          value={formData?.meta_description || ""}
          className="border-gray-300 w-full rounded-md mb-4"
        />

        <div className="flex items-center w-full py-2 px-3 border border-gray-300 rounded-md focus-within:border-2 focus-within:border-solid focus-within:border-blue-600">
          <div className="text-gray-500 text-nowrap">
            {`https://${window.location.host}/post/`}
          </div>
          <input
            id="url"
            type="text"
            name="slug"
            value={formData?.slug || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
            className="w-full m-0 p-0 ring-0 outline-none border-none focus:ring-0 focus:border-none focus:outline-none"
          />
        </div>
      </div>
    </>
  );
}

export default SEO;
