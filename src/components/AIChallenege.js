import React from "react";

const aiChallengeCard = [
  {
    img: "AI.svg",
    title: "Prove your skills",
    description:
      "Gain Substantial experience by solving real-world problems and put against others to come up with innovative solutions.",
  },
  {
    img: "AI.svg",
    title: "Learn from community",
    description:
      "One can look and analyze the solutions submitted by the other Data Scientists in the community and learn from them",
  },
  {
    img: "AI.svg",
    title: "Challenge yourself",
    description:
      "There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder.",
  },
  {
    img: "AI.svg",
    title: "Earn recognition",
    description:
      "You will stand out from the crowd. If you do well in AI challenges, it not only helps you shine in the community but also earns rewards.",
  },
];

function AIChallenege() {
  return (
    <div className="min-h-screen flex flex-col mt-20 items-center">
      <h1 className="text-5xl font-bold">
        Why Participate in{" "}
        <span className="text-green-600">AI Challenges?</span>
      </h1>
      <div className="w-3/4 mx-auto grid grid-cols-2 gap-6 mt-20">
        {aiChallengeCard.map((card, index) => (
          <div
            key={index}
            className="text-black bg-[#F8F9FD] py-16 px-10 space-y-6 rounded-3xl"
          >
            <img src={card.img} alt={card.title} className="" />
            <h1 className="text-4xl font-bold ">{card.title}</h1>
            <p className="text-2xl font-semibold text-[#64607D]">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AIChallenege;
