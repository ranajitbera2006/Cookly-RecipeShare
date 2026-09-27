import React from "react";
import truncate from "truncate-html";
import { useNavigate } from "react-router-dom";
const RecipeCard = ({ blog }) => {
  const { image, title, content, category, _id } = blog;
  const previewHTML = truncate(content, {
    byWords: true,
    length: 15,
  });
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="rounded-xl glass-stronger  space-y-2 shadow-2xl transition-all duration-300 hover:scale-102 cursor-pointer"
    >
      <div className=" rounded-xl ">
        <img
          src={image}
          alt="Recipe Image"
          title={title}
          className=" aspect-video rounded-t-xl"
        />
      </div>
      <button className="bg-primary m-1.5 px-3 py-1 rounded-full  text-white  ">
        {category}
      </button>
      <div className="p-2">
        <div>
          <h2>{title}</h2>
        </div>
        <div>
          <p
            className="text-gray-400"
            dangerouslySetInnerHTML={{ __html: previewHTML }}
          ></p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
