import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CheckBox from '@mui/material/Checkbox';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import image from '../assets/pexels-fauxels-3183197.jpg';
import PhoneIcon from '@mui/icons-material/Phone';
import Favorite from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { FavoriteBorder } from '@mui/icons-material';
import { BusinessCard } from '../utils/types';
import { addressFormatter, defaultAlt, defaultImage, phoneFormatter } from '../utils/helpers';
import { getData, setData } from '../utils/localStorage';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useToggle } from '../hooks/useToggle';
import { deleteCard } from '../utils/services';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { DataContext } from '../context/Cards';
import { useContext } from 'react';


interface B_CardProps {
    card: BusinessCard;
    setCards?: React.Dispatch<any>
}

export default function B_CARD({ card, setCards }: B_CardProps) {
    const location = useLocation()
    const [checked, toggle] = useToggle(card)
    const { id } = useParams()
    const { deleteData } = useContext(DataContext)
    const navigate = useNavigate()


    const favoriteCard = () => {
        toggle()
        let favData = getData((getData('user', 'userName')))
        if (favData) {
            if (favData.some((data: BusinessCard) => data._id === card._id)) {
                setData(getData('user', 'userName'), favData.filter((cardInfo: BusinessCard) => cardInfo._id !== card._id))
                favData = getData((getData('user', 'userName')))
                setCards && setCards(favData)
            } else {
                setData(getData('user', 'userName'), [...favData, { ...card, isFavorite: true }])
            }
        } else {
            setData(getData('user', 'userName'), [{ ...card, isFavorite: true }])
        }

    }

    function removeCard() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                if (card._id) {
                    deleteCard(card._id)
                        .then(() => {
                            toast.success('Business been removed')
                            // deleteData(card._id)
                        })
                        .catch(e => toast.error(e.response.data))
                }
            }
        })
    }

    function pathUrl(url: string) {
        return location.pathname.toLowerCase() === `${url}${id}`
    }



    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt={defaultAlt(card.imageAlt)}
                height="220"
                image={defaultImage(card.imageUrl)}
            />
            <CardContent>
                <Typography variant="h6" component="div">
                    {card.title}
                </Typography>
                <Typography paddingY={1} borderBottom={'1px solid #9d9d9d'} variant="body2" color="text.secondary">
                    {card.subtitle}
                </Typography>
                <Typography paddingTop={1} variant="body2" color="text.secondary">
                    <span style={{ fontWeight: "bold" }}> Phone:</span> {phoneFormatter(card.phone)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <span style={{ fontWeight: "bold" }}> Address:</span> {addressFormatter(card.city, card.street, card.houseNumber)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <span style={{ fontWeight: "bold" }}> Card Number:</span> {card.zip}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
                <Stack direction={'row'} spacing={1} >
                    {pathUrl(`/my%20cards/`) &&
                        <DeleteIcon onClick={removeCard} color='action' />}
                    {pathUrl(`/my%20cards/`) &&
                        <EditIcon onClick={() => navigate(`/edit/${id}`)} color='action' />
                    }
                </Stack>
                <Stack direction={'row'} spacing={1} >
                    <PhoneIcon onClick={() => console.log(location.pathname)} color='action' />
                    {getData('user', 'token') &&
                        <CheckBox onClick={favoriteCard} checked={checked} icon={<FavoriteBorder />} checkedIcon={<Favorite />} color='error' sx={{ padding: 0 }} />
                    }
                </Stack>
            </CardActions>
        </Card>
    );
}
