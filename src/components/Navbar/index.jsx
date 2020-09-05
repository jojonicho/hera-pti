import React, { useContext } from "react";
import { UserContext } from "../../utils/datastore/UserContext";
import { Instagram } from "react-content-loader";
import {
  Stack,
  Text,
  Button,
  Image,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/core";

export const Navbar = ({ children, logout }) => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Stack>
        <Stack
          spacing={1}
          isInline
          align="center"
          justify="flex-end"
          p={1}
          bg="black"
          minH={"35px"}
        >
          {!user ? (
            <Instagram />
          ) : (
            <Stack align="center" isInline spacing={1}>
              <Image
                src={user.picture}
                alt="google-profile"
                width="35px"
                borderRadius="50%"
              />
              <Text color="white">{user.name}</Text>
              <Popover trigger="click" placement="bottom-end">
                <PopoverTrigger>
                  <Icon
                    cursor="pointer"
                    mr={2}
                    color="white"
                    name="triangle-down"
                  />
                </PopoverTrigger>
                <PopoverContent width="200px">
                  <PopoverBody>
                    <Stack spacing={2}>
                      <Button>Dashboard</Button>
                      <Button onClick={logout}>Logout</Button>
                    </Stack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Stack>
          )}
        </Stack>
      </Stack>
      <Stack align="center" justify="center" mt={2}>
        {children}
      </Stack>
    </>
  );
};
