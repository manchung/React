import { useRef, useState, useCallback, useEffect } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    async function fetchUserPlaces() {
      try {
        const response = await fetch("http://localhost:3000/user-places");
        if (!response.ok) {
          throw new Error("Failed to fetch user places.");
        }
        const resData = await response.json();
        setUserPlaces(resData.places);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserPlaces();
  }, []);

  async function updateUserPlaces(places) {
    console.log("Updating user places:", places);
    try {
      await fetch("http://localhost:3000/user-places", {
        method: "PUT",
        body: JSON.stringify({
          places: places,
        }),
        headers: {
          "Content-Type": "Application/json",
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  function deleteUserPlace(id) {
    console.log("Deleting user place with id:", id);
    console.log("Current user places:", userPlaces);
    updateUserPlaces(userPlaces.filter((place) => place.id !== id));
  }

  function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }

      return [selectedPlace, ...prevPickedPlaces];
    });

    if (!userPlaces.some((place) => place.id === selectedPlace.id)) {
      updateUserPlaces([selectedPlace, ...userPlaces]);
    }
  }

  async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) => {
      console.log("handleRemovePlace called: ");
      console.log(
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        )
      );
      return prevPickedPlaces.filter(
        (place) => place.id !== selectedPlace.current.id
      );
    });

    deleteUserPlace(selectedPlace.current.id);
    setModalIsOpen(false);
  }

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
