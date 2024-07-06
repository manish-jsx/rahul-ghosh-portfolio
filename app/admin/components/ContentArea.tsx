// app/admin/components/ContentArea.tsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BeatLoader } from "react-spinners";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"


interface ApiRoute {
  path: string;
  label: string;
  type: "text" | "array"; // Add a type for the data structure (text or array)
  fields: string[]; // Array of field names (only for array type)
}

const apiRoutes: ApiRoute[] = [
  { path: "/api/about", label: "About", type: "text", fields: ["name", "title", "bio", "skills"] }, 
  {
    path: "/api/projects",
    label: "Projects",
    type: "array",
    fields: ["title", "description", "imageUrl"],
  },
  {
    path: "/api/blog",
    label: "Blog Posts",
    type: "array",
    fields: ["title", "summary", "publishedDate", "slug"],
  },
  {
    path: "/api/contact",
    label: "Contact",
    type: "array",
    fields: ["firstName", "lastName", "email", "phone", "service", "budget", "message"], // Updated fields
  },
  { path: "/api/services",
    label: "Services", 
    type: "array", 
    fields: ["id", "title","description", "icon"],
  },
]; // Add more routes

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const ContentArea = ({ selectedRoute }: { selectedRoute: string }) => {
  // ... (state variables for apiData, isLoading, error, editMode, and editedData)
  const [apiData, setApiData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<any>(null);

  // ... (useEffect for fetching data based on selectedRoute)
  // ... (handleEditClick and handleCancelClick functions)

  // ... (handleInputChange function)
  useEffect(() => {
    const fetchApiData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(selectedRoute);
        if (!response.ok) {
          throw new Error("Failed to fetch API data");
        }
        const data = await response.json();

        // Initialize editedData only for text type
        if (!Array.isArray(data)) {
          setEditedData(data); // Use this for about type only
        } else {
          setEditedData(null); // Reset for array types
        }

        setApiData(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error fetching data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedRoute) {
      fetchApiData(selectedRoute);
    }
  }, [selectedRoute]);

  const [formMode, setFormMode] = useState<"add" | "edit" | null>(null);
  const [formData, setFormData] = useState<any>(null); // Initialize based on type

  useEffect(() => {
    if (formMode === "add") {
      const initialFormData = apiRoutes
        .find((route) => route.path === selectedRoute)
        ?.fields.reduce((acc, field) => ({ ...acc, [field]: "" }), {});
      setFormData(initialFormData);
    } else if (formMode === "edit") {
      setFormData(editedData);
    } else {
      setFormData(null);
    }
  }, [formMode, selectedRoute, editedData]);

  const currentRouteConfig = apiRoutes.find(
    (route) => route.path === selectedRoute
  );




  const handleEditClick = (item: any = apiData) => { // Pass the item to edit or the whole apiData if not an array
    setEditMode(true);
    setEditedData(item);
  };

 
  const handleAddClick = () => {
    setFormMode("add");
    setEditedData(
      currentRouteConfig?.fields.reduce(
        (acc, field) => ({ ...acc, [field]: "" }),
        {}
      )
    );
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setEditedData(null); // Clear edited data
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    field?: string
  ) => {
    if (Array.isArray(apiData) && index !== undefined && field) {
      // Update specific item in array
      setEditedData((prevData: any) =>
        prevData.map((item: any, i: number) =>
          i === index
            ? {
                ...item,
                [field]: event.target.value,
              }
            : item
        )
      );
    } else {
      // Update single object (About) or other cases
      const { name, value } = event.target;
      setEditedData((prevData: any) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  
  const handleSaveClick = async () => {
    try {
      const method = formMode === "add" ? "POST" : "PUT";
      const body = formMode === "add" ? formData : // For adding, use formData
        Array.isArray(apiData)
          ? apiData.map((item: any) =>
              item.id === editedData.id ? editedData : item
            )
          : editedData; // For editing arrays or single objects

      const response = await fetch(selectedRoute, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const updatedData = await response.json();
        if (formMode === "add") {
          setApiData(Array.isArray(apiData) ? [...apiData, updatedData] : updatedData);
        } else {
          setApiData(updatedData);
        }
        setFormMode(null);
        setEditMode(false);
      } else {
        console.error("Error updating data:", await response.json());
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDeleteClick = async (itemId?: number) => {
    try {
      if (!itemId) return; // If itemId is undefined (for single-object data), do nothing

      const response = await fetch(`${selectedRoute}?id=${itemId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setApiData((prevData: any) =>
          prevData.filter((item: any) => item.id !== itemId)
        );
      } else {
        console.error("Error deleting data:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };




return (
  <main className="flex-1 p-8">
    <h1 className="text-3xl font-bold mb-4">
      {selectedRoute.split("/").pop()?.toUpperCase()}
    </h1>

    {/* Add New Button */}
    {currentRouteConfig?.type === "array" && !editMode && (
      <Button onClick={handleAddClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Add New
      </Button>
    )}

    {isLoading ? (
      <div className="flex justify-center items-center h-64">
        <BeatLoader color="#4f46e5" />
      </div>
    ) : error ? (
      <p className="text-error">{error}</p>
    ) : (
      <AnimatePresence>
        {Array.isArray(apiData) ? (
          <table className="table-auto">
            <thead>
              <tr>
                {apiRoutes
                  .find((route) => route.path === selectedRoute)
                  ?.fields.map((field) => (
                    <th key={field} className="px-4 py-2">
                      {field.toUpperCase()}
                    </th>
                  ))}
                <th className="px-4 py-2">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {/* Render Existing Items (with edit/delete buttons) */}
              {apiData.map((item: any, index: number) => (
                <tr key={index}>
                  {apiRoutes
                    .find((route) => route.path === selectedRoute)
                    ?.fields.map((field) => (
                      <td key={field} className="border px-4 py-2">
                        {editMode && index === apiData.indexOf(editedData) ? ( // Compare objects directly
                          <Input
                            type={field === "id" ? "number" : "text"}
                            name={field}
                            value={editedData[field] || ""}
                            onChange={(e) => handleInputChange(e, index, field)} // Pass index and field
                            className="input input-bordered w-full"
                          />
                        ) : (
                          item[field]
                        )}
                      </td>
                    ))}
                  <td className="border px-4 py-2">
                    {editMode && index === apiData.indexOf(editedData) ? (
                      <>
                        <Button onClick={handleSaveClick}>Save</Button>
                        <Button onClick={handleCancelClick} variant="secondary">
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => handleEditClick(item)} // Pass the item to handleEditClick
                          variant="outline"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteClick(item.id)}
                          variant="destructive"
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
                
              ))}

              {/* Render Form for Adding New Item (if formMode === 'add') */}
              {formMode === "add" && (
                <tr>
                  {currentRouteConfig?.fields.map((field) => (
                    <td key={field} className="border px-4 py-2">
                      <Input
                        type={field === "id" ? "number" : "text"}
                        name={field}
                        value={formData?.[field] || ""} // Handle undefined value
                        onChange={handleInputChange}
                        className="w-full"
                      />
                    </td>
                  ))}
                  <td className="border px-4 py-2">
                    <Button onClick={handleSaveClick}>Save</Button>
                    <Button onClick={handleCancelClick} variant="secondary">
                      Cancel
                    </Button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          // Text Area for Single Object Data ("About")
          <div>
            {editMode ? (
              <div className="flex flex-col space-y-4">
                {/* Render the fields as individual components */}
                {Object.entries(apiData).map(([key, value]) => {
                  // Handle arrays like skills separately
                  if (Array.isArray(value)) {
                    return (
                      <div key={key}>
                        <h3 className="text-lg font-semibold">{key}:</h3>
                        <ul>
                          {value.map((skill: any, index: number) => (
                            <li key={index}>
                              <Input
                                type="text"
                                name={key}
                                value={editedData[key][index] || ""}
                                onChange={(e) =>
                                  handleInputChange(e, index, key)
                                }
                                className="w-full"
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }

                  return (
                    <div key={key}>
                      <label htmlFor={key} className="text-lg font-semibold">
                        {key}:
                      </label>
                      <Input
                        type="text"
                        name={key}
                        value={editedData[key] || ""}
                        onChange={(e) => handleInputChange(e)}
                        className="input input-bordered w-full bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                {/* Render the fields as individual components */}
                {Object.entries(apiData).map(([key, value]) => {
                  // Handle arrays like skills separately
                  if (Array.isArray(value)) {
                    return (
                      <div key={key}>
                        <h3 className="text-lg font-semibold">{key}:</h3>
                        <ul>
                          {value.map((skill: any, index: number) => (
                            <li key={index}>{skill}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  }

                  return (
                    <div key={key}>
                      <h3 className="text-lg font-semibold">{key}:</h3>
                      <p>{value}</p>
                    </div>
                  );
                })}
              </div>
            )}
            <div>
              {editMode ? (
                <>
                  <Button className="mr-2" onClick={handleSaveClick}>
                    Save
                  </Button>
                  <Button onClick={handleCancelClick} variant="secondary">
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => handleEditClick(apiData)}>Edit</Button> // Pass the apiData to handleEditClick 
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
    )}
  </main>
);
};

export default ContentArea;