import { Button } from "flowbite-react";



const About = () => {
    return (
        <div className="flex justify-center gap-40 mb-48">
        <div>
            <img className="relative w-[390px] h-[373px]" src="https://i.ibb.co/DkFcbCG/parts.jpg" alt="" />
            <img className="absolute ml-48 w-[300px] bg-white p-2 h-[250px] mt-[-140px]" src="https://i.ibb.co/PGHr4K0/person.jpg" alt="" />
        </div>
        <div>
            <p className="text-lg">About Us</p>
            <br />
            <h2 className="text-4xl font-medium">We are qualified <br /> & of experience <br /> in this field</h2>
            <br />
            <p className="leading-7">
            There are many variations of passages of Lorem Ipsum <br /> available, but the majority have suffered alteration in some <br /> form, by injected humour, or randomised words which do not <br /> look even slightly believable. 
            </p>
            <br />
            <Button color="success">
        Success
    </Button>
        </div>
        </div>
    );
};

export default About;