import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";

const CreateMedia = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [director, setDirector] = useState("");
  const [runtime, setRuntime] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [genre, setGenre] = useState("");
  const [cast, setCast] = useState("");
  const [tags, setTags] = useState("");
  const [plot, setPlot] = useState("");
  const [rating, setRating] = useState("");
  const [language, setLanguage] = useState("");
  const [trailer, setTrailer] = useState("");
  const [poster, setPoster] = useState("");

  const [titleError, setTitleError] = useState("");
  const [yearError, setYearError] = useState("");
  const [directorError, setDirectorError] = useState("");
  const [runtimeError, setRuntimeError] = useState("");
  const [mediaTypeError, setMediaTypeError] = useState("");
  const [genreError, setGenreError] = useState("");
  const [castError, setCastError] = useState("");
  const [tagsError, setTagsError] = useState("");
  const [plotError, setPlotError] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [languageError, setLanguageError] = useState("");
  const [trailerError, setTrailerError] = useState("");
  const [posterError, setPosterError] = useState("");

  const postMedia = async (payload) => {
    const headers = {
      "Content-type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("Admin_token")),
    };
    try {
      const response = await axios.post(
        "https://bronze-salamander-cuff.cyclic.app/media/create",
        payload,
        {
          headers: headers,
        }
      );
      console.log(response);
      toast({
        title: "Media Updated.",
        description: "The Media has been Updated!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/admin/media");
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      const movie = {
        title,
        year: Number(year),
        director,
        runtime,
        mediaType,
        genre: genre.split(","),
        cast: cast.split(","),
        tags: tags.split(","),
        plot,
        rating: Number(rating),
        language,
        trailer,
        poster,
      };
      setTitleError("");
      setYearError("");
      setDirectorError("");
      setRuntimeError("");
      setMediaTypeError("");
      setGenreError("");
      setCastError("");
      setTagsError("");
      setPlotError("");
      setRatingError("");
      setLanguageError("");
      setTrailerError("");
      setPosterError("");
      //   console.log(movie);
      postMedia(movie);
    } else {
      setTitleError(errors.title);
      setYearError(errors.year);
      setDirectorError(errors.director);
      setRuntimeError(errors.runtime);
      setMediaTypeError(errors.mediaType);
      setGenreError(errors.genre);
      setCastError(errors.cast);
      setTagsError(errors.tags);
      setPlotError(errors.plot);
      setRatingError(errors.rating);
      setLanguageError(errors.language);
      setTrailerError(errors.trailer);
      setPosterError(errors.poster);
    }
  };

  const validate = () => {
    const errors = {};
    if (!title.trim()) {
      errors.title = "Please enter a title";
    }
    if (!year.trim() || isNaN(year)) {
      errors.year = "Please enter a valid year";
    }
    if (!director.trim()) {
      errors.director = "Please enter a director";
    }
    if (!runtime.trim()) {
      errors.runtime = "Please enter a runtime";
    }
    if (!mediaType.trim()) {
      errors.mediaType = "Please select a media type";
    }
    if (!genre.trim()) {
      errors.genre = "Please enter at least one genre";
    } else if (genre.split(",").length === 0) {
      errors.genre = "Please enter at least one genre";
    }
    if (!cast.trim()) {
      errors.cast = "Please enter at least one cast member";
    } else if (cast.split(",").length === 0) {
      errors.cast = "Please enter at least one cast member";
    }
    if (!tags.trim()) {
      errors.tags = "Please enter at least one tag";
    } else if (tags.split(",").length === 0) {
      errors.tags = "Please enter at least one tag";
    }
    if (!plot.trim()) {
      errors.plot = "Please enter a plot";
    }
    if (!rating.trim() || isNaN(rating)) {
      errors.rating = "Please enter a valid rating";
    }
    if (!language.trim()) {
      errors.language = "Please enter a language";
    }
    if (!trailer.trim()) {
      errors.trailer = "Please enter a trailer URL";
    }
    if (!poster.trim()) {
      errors.poster = "Please enter a poster URL";
    }
    return errors;
  };

  return (
    <>
      <AdminNav />
      <div
        style={{ padding: "10px", textAlign: "center", paddingTop: "100px" }}
      >
        <Heading>Add New Media</Heading>
        <Box
          w={["100%", "50%"]}
          m="auto"
          mt="20px"
          p={"10px"}
          borderRadius={"10px"}
          boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
        >
          <form onSubmit={handleSubmit}>
            <FormControl id="title" isInvalid={!!titleError}>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              <FormErrorMessage>{titleError}</FormErrorMessage>
            </FormControl>

            <FormControl id="year" isInvalid={!!yearError} mt="1rem">
              <FormLabel>Year</FormLabel>
              <Input
                type="number"
                value={year}
                onChange={(event) => setYear(event.target.value)}
              />
              <FormErrorMessage>{yearError}</FormErrorMessage>
            </FormControl>

            <FormControl id="director" isInvalid={!!directorError} mt="1rem">
              <FormLabel>Director</FormLabel>
              <Input
                type="text"
                value={director}
                onChange={(event) => setDirector(event.target.value)}
              />
              <FormErrorMessage>{directorError}</FormErrorMessage>
            </FormControl>

            <FormControl id="runtime" isInvalid={!!runtimeError} mt="1rem">
              <FormLabel>Run Time</FormLabel>
              <Input
                type="text"
                value={runtime}
                onChange={(event) => setRuntime(event.target.value)}
              />
              <FormErrorMessage>{runtimeError}</FormErrorMessage>
            </FormControl>

            <FormControl id="mediaType" isInvalid={!!mediaTypeError} mt="1rem">
              <FormLabel>Media Type</FormLabel>
              <Select
                value={mediaType}
                onChange={(event) => setMediaType(event.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Movie">Movie</option>
                <option value="Show">Show</option>
              </Select>
              <FormErrorMessage>{mediaTypeError}</FormErrorMessage>
            </FormControl>

            <FormControl id="genre" isInvalid={!!genreError} mt="1rem">
              <FormLabel>Genre</FormLabel>
              <Input
                type="text"
                value={genre}
                onChange={(event) => setGenre(event.target.value)}
              />
              <FormErrorMessage>{genreError}</FormErrorMessage>
            </FormControl>

            <FormControl id="cast" isInvalid={!!castError} mt="1rem">
              <FormLabel>Cast</FormLabel>
              <Input
                type="text"
                value={cast}
                onChange={(event) => setCast(event.target.value)}
              />
              <FormErrorMessage>{castError}</FormErrorMessage>
            </FormControl>

            <FormControl id="tags" isInvalid={!!tagsError} mt="1rem">
              <FormLabel>Tags</FormLabel>
              <Input
                type="text"
                value={tags}
                onChange={(event) => setTags(event.target.value)}
              />
              <FormErrorMessage>{tagsError}</FormErrorMessage>
            </FormControl>

            <FormControl id="plot" isInvalid={!!plotError} mt="1rem">
              <FormLabel>Plot</FormLabel>
              <Textarea
                value={plot}
                onChange={(event) => setPlot(event.target.value)}
              />
              <FormErrorMessage>{plotError}</FormErrorMessage>
            </FormControl>

            <FormControl id="rating" isInvalid={!!ratingError} mt="1rem">
              <FormLabel>Rating</FormLabel>
              <Input
                type="text"
                value={rating}
                onChange={(event) => setRating(event.target.value)}
              />
              <FormErrorMessage>{ratingError}</FormErrorMessage>
            </FormControl>

            <FormControl id="language" isInvalid={!!languageError} mt="1rem">
              <FormLabel>Language</FormLabel>
              <Input
                type="text"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
              />
              <FormErrorMessage>{languageError}</FormErrorMessage>
            </FormControl>

            <FormControl id="trailer" isInvalid={!!trailerError} mt="1rem">
              <FormLabel>Trailer URL</FormLabel>
              <Input
                type="text"
                value={trailer}
                onChange={(event) => setTrailer(event.target.value)}
              />
              <FormErrorMessage>{trailerError}</FormErrorMessage>
            </FormControl>

            <FormControl id="poster" isInvalid={!!posterError} mt="1rem">
              <FormLabel>Poster URL</FormLabel>
              <Input
                type="text"
                value={poster}
                onChange={(event) => setPoster(event.target.value)}
              />
              <FormErrorMessage>{posterError}</FormErrorMessage>
            </FormControl>

            <Button mt="1rem" colorScheme="blue" type="submit">
              Create
            </Button>
          </form>
        </Box>
      </div>
    </>
  );
};

export default CreateMedia;
