import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useParams } from "react-router-dom";
import * as Yup from "yup";
import { usePosts } from "../context/postContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect, useState } from "react";

export function PostForm() {
  const { createPost, getPost, updatePost } = usePosts();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: null,
    assignedTo: "", // Nuevo campo asignado a alguien
    dueDate: null, // Nuevo campo de fecha de entrega
    completed: false, // Nuevo campo de estado de completado
  });
  const params = useParams();

  useEffect(() => {
    (async () => {
      if (params.id) {
        const post = await getPost(params.id);
        setPost({
          title: post.title,
          description: post.description,
          assignedTo: post.assignedTo, // Establecer el valor asignado
          dueDate: post.dueDate, // Establecer la fecha de entrega
          completed: post.completed, // Establecer el estado de completado
        });
      }
    })();
  }, [params.id, getPost]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">
        <header className="flex justify-between items-center py-4 text-white">
          <h3 className="text-xl">Nueva Tarea</h3>
          <Link to="/" className="text-gray-400 text-sm hover:text-gray-300">
            Ir atrás
          </Link>
        </header>
        <Formik
          initialValues={post}
          enableReinitialize
          validationSchema={Yup.object({
            title: Yup.string().required("Title is Required"),
            description: Yup.string().required("Description is Required"),
            assignedTo: Yup.string().required("Assigned To is Required"), // Validación para el campo asignado a alguien
            dueDate: Yup.date(), // Validación opcional para el campo de fecha de entrega
            completed: Yup.boolean(), // Validación opcional para el campo de estado de completado
          })}
          onSubmit={async (values, actions) => {
            if (params.id) {
              await updatePost(params.id, values);
            } else {
              await createPost(values);
            }
            actions.resetForm();
            actions.setSubmitting(false);
            navigate("/");
          }}
        >
          {({ setFieldValue, isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <label
                htmlFor="title"
                className="text-sm block font-bold mb-2 text-gray-400"
              >
                Titulo
              </label>
              <Field
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                placeholder="Post title"
                name="title"
                // autoFocus
              />
              <ErrorMessage
                component="p"
                name="title"
                className="text-red-400 text-sm"
              />

              <label
                htmlFor="description"
                className="text-sm block font-bold mb-2 text-gray-400"
              >
                Descripción
              </label>
              <Field
                component="textarea"
                name="description"
                id="description"
                placeholder="Write a description"
                rows="3"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
              />
              <ErrorMessage
                component="p"
                name="description"
                className="text-red-400 text-sm"
              />
              <label
                htmlFor="assignedTo"
                className="text-sm block font-bold mb-2 text-gray-400"
              >
                Asignar a:
              </label>
              <Field
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                placeholder="Assignee"
                name="assignedTo"
              />

              <label
                htmlFor="dueDate"
                className="text-sm block font-bold mb-2 text-gray-400"
              >
                Fecha de entrega
              </label>
              <Field
                type="date"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                name="dueDate"
              />

              <label
                htmlFor="completed"
                className="text-sm block font-bold mb-2 text-gray-400"
              >
                Completado
              </label>
              <Field
                type="checkbox"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white"
                name="completed"
              />
              <label
                htmlFor="image"
                className="text-sm block font-bold mb-2 text-gray-400"
              >
                Imagen
              </label>
              <input
                type="file"
                name="image"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                onChange={(e) => setFieldValue("image", e.target.files[0])}
              />
              <ErrorMessage
                component="p"
                name="image"
                className="text-red-400 text-sm"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                ) : (
                  "Guardar"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
