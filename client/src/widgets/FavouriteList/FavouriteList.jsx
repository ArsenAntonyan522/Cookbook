import  { useState, useEffect } from "react";
import { List, Card, message as antMessage, Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import RecipeApi from "../../entities/recipe/RecipeApi";


export default function FavouriteList() {
  const [favorites, setFavorites] = useState([]); 
  const [loading, setLoading] = useState(true); 


  async function fetchFavorites (){
    try {
      const response = await RecipeApi.getAllFavorites(); 
      setFavorites(response.data); 
    } catch (error) {
      antMessage.error(error.message);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) {
    return <p>Uploading recipes...</p>;
  }

  async function deleteFavHandler(recipeId) {
    try {
       await RecipeApi.deleteFromFav(recipeId)
        setFavorites((prev) => [...prev].filter((el) => el.recipeId !== recipeId));
        antMessage.success("The recipe has been deleted");
    } catch (error) {
      antMessage.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Favourites 💜  </h2>
      <h4>(не забудь, приготовить)</h4>
      {favorites.length > 0 ? (
        <List
          grid={{ gutter: 16, column: 4 }} 
          dataSource={favorites} 
          renderItem={(recipe) => (
            <List.Item>
              <Card
                title={recipe.title}
                cover={
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    style={{ height: 200, objectFit: "cover" }} 
                  />
                }
              >
                <div style={{ marginTop: "10px" }}>
                  <Popconfirm
                    title="Are you sure, baby?"
                    onConfirm={() => deleteFavHandler(recipe.recipeId)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      type="primary"
                      style={{
                        background: "#6a9aff",
                        border: "none",
                        color: "ffffff",
                        fontWeight: "bold",
                      }}
                    >
                      Delete
                    </Button>
                  </Popconfirm>
                </div>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <div>
        <p> </p>
        <img src="https://www.meme-arsenal.com/memes/a6719f86288b339b56b7a3661961b84c.jpg"
          alt="no favorites"
        style={{ width: "100%", maxWidth: "900px", marginTop: "30px" }}/>
        </div>
      )}
    </div>
  );
}








