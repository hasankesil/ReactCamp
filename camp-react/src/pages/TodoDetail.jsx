import React from 'react'
import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Button,
    Card,
    Image
} from 'semantic-ui-react'
import { useParams } from 'react-router-dom'

export default function TodoDetail() {
    let { title } = useParams()
    return (
        <div>
            Kullanıcı Adı :  {title}
            <Card fluid>
                <CardContent>
                    <Image
                        floated='right'
                        size='mini'
                        src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                    />
                    <CardHeader>Steve Sanders</CardHeader>
                    <CardMeta>Friends of Elliot</CardMeta>
                    <CardDescription>
                        Steve wants to add you to the group <strong>best friends</strong>
                    </CardDescription>
                </CardContent>
                <CardContent extra>
                    <div className='ui two buttons'>
                        <Button basic color='green'>
                            Approve
                        </Button>
                        <Button basic color='red'>
                            Decline
                        </Button>
                    </div>
                </CardContent>
            </Card>


        </div>
    )
}
