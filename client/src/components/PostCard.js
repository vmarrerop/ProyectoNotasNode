import toast from "react-hot-toast";
import { usePosts } from "../context/postContext";
import { useNavigate } from "react-router-dom";

export function PostCard({ post }) {
  const { deletePost, updatePost } = usePosts();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div>
          <p className="text-white">
            Seguro quiere eliminar? <strong>{id}</strong>?
          </p>
          <div>
            <button
              className="bg-red-500 hover:bg-red-400 px-3 py-2 text-sm text-white rounded-sm mx-2"
              onClick={(e) => {
                deletePost(id);
                toast.dismiss(t.id);
              }}
            >
              Eliminar
            </button>
            <button
              className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      {
        duration: "4000",
        style: {
          background: "#202020"
        }
      }
    );
  };

  const handleCompleteToggle = async (id, completed) => {
    await updatePost(id, { completed: !completed });
  };

  return (
    <div
      className="bg-zinc-800 text-white rounded-md shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer"
      onClick={() => navigate(`/${post._id}`)}
    >
      <div className="px-4 py-7">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-semibold">{post.title}</h3>
          <div>
            <button
              className={`bg-${post.completed ? 'green' : 'red'}-600 text-sm px-2 py-1 rounded-sm`}
              onClick={(e) => {
                e.stopPropagation();
                handleCompleteToggle(post._id, post.completed);
              }}
            >
              {post.completed ? 'Marcar Incompleto' : 'Marcar Completo'}
            </button>
            <button
              className="bg-red-600 text-sm px-2 py-1 rounded-sm ml-2"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(post._id);
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
        <p className="text-gray-400 mb-5">{post.description}</p>
        <p className="text-white overline mb-5">Asigando a: {post.assignedTo}</p>
        <p className="text-white overline">Fecha de entrega: {post.dueDate}</p>
      </div>
      {post.image && <img src={post.image.url} alt={post.title} />}
    </div>
  );
}