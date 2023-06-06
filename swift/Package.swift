// swift-tools-version:5.5
import PackageDescription

let package = Package(
    name: "swift-http-server",
    dependencies: [
        .package(url: "https://github.com/IBM-Swift/Kitura.git", from: "3.0.0")
    ],
    targets: [
        .executableTarget(
            name: "swift-http-server",
            dependencies: [
                .product(name: "Kitura", package: "Kitura")
            ]
        )
    ]
)
