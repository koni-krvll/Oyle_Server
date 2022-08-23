# Endpoints

**Prefix to all endpoints is ``/api/v1/``**

## Club

**Prefix to this collection is ``/club/``**

### Get all

GET ``/all`` : ``[Partial<Club>]``

### Get by id

GET ``/:id`` : ``Club``

## Event

**Prefix to this collection is ``/event/``**

### Get all

GET ``/all`` : ``[Partial<Event>]``

### Get by id

GET ``:id`` : ``Event``

## User

**Prefix to this collection is ``/user/``**.

**Headers for this collection are**:
- Authorization: Bearer ${TOKEN}

Where token is a Google Firebase Auth token.


### Login

GET ``/login`` : ``User & DDMSwitch?``

POST ``/ddm/setup``: ``DDMSwitch``
- Body: ``DDMSwitch``

POST ``/ddm/stop``: ``DDMSwitch``
- Body: ``{ password: string }``

GET ``/ddm/alive``: ``{ message }``

# Models

## Club

``id: number``

``name: string``

``description: string``

``address: string``

``region: string``

``country: string``

``eventsSoFar: number``

``capacity: number``

``recommended: boolean``

``closed: boolean``

``live: boolean``

``artists: [json]``

``placeId: string``

``lat: number``

``lng: number``

``status: string``

``hours: json``

``price: number``

``rating: number``

``ratings: number``

``vicinity: string``

``website: string(url)``

``logo: string(url)``

``image: string(url)``

``types: [string]``

## Event

``id: number``

``name: string``

``description: string``

``age: number``

``cost: string``

``date: string(Date)``

``startTime: string(DateTime)``

``endTime: string(DateTime)``

``attending: number``

``lineup: string``

``ticketed: boolean``

``festival: boolean``

``club: number(id)``

## DDMSwitch

``starts: string(DateTime)``

``ends: string(DateTime)``

``updated: string(DateTime)``

``phone: string(Phone)``

``interval: number(seconds)``

``password: string``

``message: string``

``userUid: string (user.uid)``

## User

``uid: string(id)``