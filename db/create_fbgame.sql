insert into fbgames (dateAndTime, player1, player2, player1points, player2points, player1mmr, player2mmr) 
values ($1, $2, $3, $4, $5, $6, $7)
returning *;