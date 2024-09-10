import { useNavigate } from "react-router-dom";

function ListPage() {
  const navigate = useNavigate();

  const handleChallenge = () => {
    navigate("/create-challenge");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-11/12 mx-auto p-4">
        <img src="logo.png" alt="Company Logo" />
      </header>

      <section className="heroSection flex flex-grow bg-[#003145] p-20">
        <div className="mt-40">
          <div
            className="border-yellow-500 border-8 rotate-90"
            style={{ width: "150px" }}
          ></div>
        </div>

        <div className="w-3/5 mt-20">
          <h1 className="text-7xl text-white font-bold">
            Accelerate Innovation
          </h1>
          <h1 className="text-7xl text-white mt-3 font-bold">
            with Global AI Challenges
          </h1>
          <p className="text-white mt-10 text-3xl">
            AI Challenges at DPhi simulate real-world problems. It is a <br />
            great place to put your AI/Data Science skills to test on <br />
            diverse datasets allowing you to foster learning through <br />
            competitions.
          </p>
          <button
            onClick={handleChallenge}
            className="text-black bg-white px-10 py-3 text-xl tracking-wide font-bold rounded-lg mt-10 text-[#003145]"
          >
            Create Challenge
          </button>
        </div>

        <div className="">
          <img
            src="rocket.svg"
            alt="Decorative Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <div className="bg-[#002A3B] bottomContainer text-white flex p-20">
        <div className="w-1/3 flex justify-center items-center gap-5">
          <img src="AI.svg" alt="" />
          <div className="textContainer">
            <h1 className="text-3xl font-bold">100K+</h1>
            <h1 className="text-lg font-bold">AI Model Submissions</h1>
          </div>
        </div>
        <div
          className="bg-white"
          style={{
            width: "60px",
            height: "2px",
            transform: "rotate(90deg)",
            marginTop: "25px",
          }}
        ></div>
        <div className="w-1/3 flex justify-center items-center gap-5">
          <img src="group.svg" alt="" />
          <div className="textContainer">
            <h1 className="text-3xl font-bold">50K+</h1>
            <h1 className="text-lg font-bold">Data Scientists</h1>
          </div>
        </div>
        <div
          className="bg-white"
          style={{
            width: "60px",
            height: "2px",
            transform: "rotate(90deg)",
            marginTop: "25px",
          }}
        ></div>

        <div className="w-1/3 flex justify-center items-center gap-5">
          <img src="aichallenge.svg" alt="" />
          <div className="textContainer">
            <h1 className="text-3xl font-bold">100K+</h1>
            <h1 className="text-lg font-bold">AI Challenges Hosted</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListPage;
