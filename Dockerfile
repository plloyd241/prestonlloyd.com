# Set up compiler image
FROM golang:latest AS builder

WORKDIR /build
COPY . /build

RUN go get -u github.com/gorilla/mux
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .

# Set up main image
FROM scratch

WORKDIR /app/
COPY --from=builder /build/app .

CMD ["./app"]