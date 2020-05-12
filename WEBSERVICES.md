# WebServices

The WebServices are based on ASP.net Web Api 2.0 and are accessible with the prefix `/api/`.

## Teams

### `/api/teams`
Returns all teams

    [
		{ 
			id,
			name,
			fullTeamName,
			country{
				countryCode,
				countryName
			},
			powerUnit,
			technicalChief,
			chassis,
			firstDriver{ 
				id,
				firstname,
				lastname,
				dob,
				placeOfBirth,
				country{
					countryCode,
					countryName
				},
				img,
				description
			},
			secondDriver{
				-Driver-
			},
			logo,
			img
		},
		{ Team },
	]

### `/api/teams/<id>`
Returns specific team by id

    { 
		id,
		name,
		fullTeamName,
		country{
			countryCode,
			countryName
		},
		powerUnit,
		technicalChief,
		chassis,
		firstDriver{
			id,
			firstname,
			lastname,
			dob,
			placeOfBirth,
			country{
				countryCode,
				countryName
			},
			img,
			description
		},
		secondDriver{
			-Driver-
		},
		logo,
		img
	}
	
### `/api/teams/simple`
Returns all teams with the TeamSimple DTO

    [
		{ 
			id,
			name,
			country,
			logo,
			firstDriver,
			secondDriver,
			img
		},
		{ TeamSimple },
	]
	
## Driver

### `/api/drivers`
Returns all drivers

    [
		{ 
			id,
			firstname,
			lastname,
			dob,
			placeOfBirth,
			country{
				countryCode,
				countryName
			},
			img,
			description
		},
		{ Driver },
	]

### `/api/drivers/<id>`
Returns specific driver by id

    { 
		id,
		firstname,
		lastname,
		dob,
		placeOfBirth,
		country{
			countryCode,
			countryName
		},
		img,
		description
	}
	
### `/api/drivers/simple
Returns all driver with the DriverSimple DTO

    [
		{ 
			id,
			firstname,
			lastname,
			countrycode,
			img
		},
		{ DriverSimple },
	]
	
## Countries

### `/api/countries`
Returns all countries

    [
		{ 
			countryCode,
			countryName
		},
		{ Country },
	]

### `/api/countries/<id>`
Returns specific country by id

    { 
		countryCode,
		countryName
	}
	
## Circuits

### `/api/circuits`
Returns all circuits

    [
		{ 
			id,
			name,
			length,
			nLaps,
			country{
				countryCode,
				countryName
			},
			recordLap,
			img
		},
		{ Circuit },
	]

### `/api/circuits/<id>`
Returns specific circuit by id

    { 
		id,
		name,
		length,
		nLaps,
		country{
			countryCode,
			countryName
		},
		recordLap,
		img
	}

## RacesScores

### `/api/racesscores`
Returns all RacesScores

    [
		id,
		driver{
			id,
			firstname,
			lastname,
			dob,
			placeOfBirth,
			country{
				countryCode,
				countryName
			},
			img,
			description
		},
		pos{
			pos,
			score,
			description
		},
		race{
			id,
			name,
			circuit{
				id,
				name,
				length,
				nLaps,
				country{
					countryCode,
					countryName
				},
				recordLap,
				img
				},
			date
		},
		fastestLap,
		{ RacesScore },
	]

### `/api/racesscores/<id>`
Returns specific race score by id

    { 
		id,
		driver{
			id,
			firstname,
			lastname,
			dob,
			placeOfBirth,
			country{
				countryCode,
				countryName
			},
			img,
			description
		},
		pos{
			pos,
			score,
			description
		},
		race{
			id,
			name,
			circuit{
				id,
				name,
				length,
				nLaps,
				country{
					countryCode,
					countryName
				},
				recordLap,
				img
				},
			date
		},
		fastestLap
	}
	
## Scores

### `/api/scores`
Returns all scores

    [
		{ 
			pos,
			score,
			description
		},
		{ Score },
	]

### `/api/scores/<pos>`
Returns specific score by pos

    { 
		pos,
		score,
		description
	}
	
## Races

### `/api/races`
Returns all races

    [
		{ 
			id,
			name,
			circuit{
				id,
				name,
				length,
				nLaps,
				country{
					countryCode,
					countryName
				},
				recordLap,
				img
			},
			date
		},
		{ Race },
	]

### `/api/races/<id>`
Returns specific race by id

    { 
		id,
		name,
		circuit{
			id,
			name,
			length,
			nLaps,
			country{
				countryCode,
				countryName
			},
			recordLap,
			img
		},
		date
	}