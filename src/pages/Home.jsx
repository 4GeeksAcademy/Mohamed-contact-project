import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Contact.jsx";
import { Input } from "../components/Input.jsx";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<div className="text-center mt-5">
			<h1>My Contacts:</h1>
			<Card/>
			<Input/>
			
		</div>
	);
}; 