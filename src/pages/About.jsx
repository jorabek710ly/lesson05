import { useQuery } from "@tanstack/react-query";
import React from "react";
import { api } from "../api";

const About = () => {
  const { data, isLoading, error, isError, isSuccess, isFetched } = useQuery({
    queryKey: ["user"],
    queryFn: () => api.get("/users"),
  });

  return (
    <div>
      About
      {isLoading && <p>Loading...</p>}
      {data?.data?.users?.map((user) => (
        <div key={user.id}>{user.firstName}</div>
      ))}
    </div>
  );
};

export default About;
