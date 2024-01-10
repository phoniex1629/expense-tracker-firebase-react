import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import "./styles.css";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

export const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo;

  const signInWithGoogle = async () => {
    const res = await signInWithPopup(auth, provider);

    const authInfo = {
      userID: res.user.uid,
      name: res.user.displayName,
      profilePhoto: res.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
  };

  if (isAuth) {
    return <Navigate to="/expense-tracker" />
  }
  return (
    <div className="login-page">
      <p>Sign In With Google</p>
      <button className="login-wuth-google-btn" onClick={signInWithGoogle}>
        Sign In With Google
      </button>
    </div>
  );
};
