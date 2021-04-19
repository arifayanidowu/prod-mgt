import Features from "./Features";
import Hero from "./Hero";
import Wrapper from "./Wrapper";

const Home = ({ toggleTheme }) => {
  return (
    <Wrapper {...{ toggleTheme }}>
      <Hero />
      <Features />
    </Wrapper>
  );
};

export default Home;
