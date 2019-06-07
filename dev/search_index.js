var documenterSearchIndex = {"docs":
[{"location":"#RayTracer-:-Differentiable-Ray-Tracing-in-Julia-1","page":"Home","title":"RayTracer : Differentiable Ray Tracing in Julia","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"RayTracer.jl is a library for differentiable ray tracing. It provides utilities for","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Render complex 3D scenes.\nDifferentiate the Ray Tracer wrt arbitrary scene parameters for Gradient Based Inverse Rendering.","category":"page"},{"location":"#Installation-1","page":"Home","title":"Installation","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Download Julia 1.1 or later. ","category":"page"},{"location":"#","page":"Home","title":"Home","text":"note: Note\nThis library won't work with Julia 1.0.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"For the time being, the library is under active development and hence is not registered. But the master branch is pretty stable for experimentation. To install it simply open a julia REPL and  do ] add https://github.com/avik-pal/RayTracer.jl.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"The master branch will do all computation on CPU. To try out the experimental GPU support do ] add https://github.com/avik-pal/RayTracer.jl#ap/gpu. To observe the potential performance gains of using GPU you will have to render scenes having more number of objects and the 2D image must be of reasonably high resolution.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"note: Note\nOnly rendering is currently supported on GPUs. Gradient Computation is broken but will be supported in the future.","category":"page"},{"location":"#Contents-1","page":"Home","title":"Contents","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Pages = [\"index.md\",\n         \"getting_started/rendering.md\",\n         \"getting_started/optimization.md\",\n         \"api.md\"]\nDepth = 3","category":"page"},{"location":"#Contributions-1","page":"Home","title":"Contributions","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"This package is written and maintained by Avik Pal. Please fork and send a pull request or create a GitHub issue for bug reports or feature requests.","category":"page"},{"location":"#Index-1","page":"Home","title":"Index","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"","category":"page"},{"location":"getting_started/rendering/#Rendering-1","page":"Rendering","title":"Rendering","text":"","category":"section"},{"location":"getting_started/rendering/#A-Step-By-Step-Introduction-to-Rendering-1","page":"Rendering","title":"A Step-By-Step Introduction to Rendering","text":"","category":"section"},{"location":"getting_started/rendering/#","page":"Rendering","title":"Rendering","text":"The very first step for in any application of the ray tracer is to define the scene parameters. This refers to","category":"page"},{"location":"getting_started/rendering/#","page":"Rendering","title":"Rendering","text":"Screen Size: We are defining it as a named tuple but it can be anything you wish.\nscreen_size = (w = 512, h = 512)\nLight Source(s): We can either define a single light source or a vector of light sources. Depending on the input the raytracer dispatches to the correct function.\nlight = PointLight(Vec3(1.0f0), 20000.0f0, Vec3(1.0f0, 5.0f0, -1.0f0))\nConfiguration of the Camera\ncam = Camera(Vec3(0.0f0, 0.35f0, -1.0f0), Vec3(1.0f0, 0.0f0, 1.0f0), Vec3(0.0f0, 1.0f0, 0.0f0),\n             45.0f0, 1.0f0, screen_size.w, screen_size.h)\n\norigin, direction = get_primary_rays(cam)\n(Most Importantly) The Objects present in the Scene\nscene = [\n    SimpleSphere(Vec3(0.75f0, 0.1f0, 1.0f0), 0.6f0, color = rgb(0.0f0, 0.0f0, 1.0f0)),\n    SimpleSphere(Vec3(-0.75f0, 0.1f0, 2.25f0), 0.6f0, color = rgb(0.5f0, 0.223f0, 0.5f0)),\n    SimpleSphere(Vec3(-2.75f0, 0.1f0, 3.5f0), 0.6f0, color = rgb(1.0f0, 0.572f0, 0.184f0)),\n    CheckeredSphere(Vec3(0.0f0, -99999.5f0, 0.0f0), 99999.0f0,\n                    color1 = rgb(0.0f0, 1.0f0, 0.0f0),\n                    color2 = rgb(0.0f0, 0.0f0, 1.0f0), reflection = 0.25f0)\n]","category":"page"},{"location":"getting_started/rendering/#","page":"Rendering","title":"Rendering","text":"For understanding what every single parameter means refer to the API Documentation. Now that we have defined the entire 3D scene, we need to render it. Currently we support only the blinn phong rendering model. In the next step there is nothing much to configure. The only configurable option is whether we want to have global illumination or not.","category":"page"},{"location":"getting_started/rendering/#","page":"Rendering","title":"Rendering","text":"Firstly let us try to see the image without global illumination. For this we simply pass the last paramter to raytrace function as any number >= 2.","category":"page"},{"location":"getting_started/rendering/#","page":"Rendering","title":"Rendering","text":"color_no_gillum = raytrace(origin, direction, scene, light, origin, 2)\n\nimg_no_gillum = get_image(color_no_gillum, screen_size...)","category":"page"},{"location":"getting_started/rendering/#","page":"Rendering","title":"Rendering","text":"The generated image should look like this:","category":"page"},{"location":"getting_started/rendering/#","page":"Rendering","title":"Rendering","text":"(Image: No Global Illumination)","category":"page"},{"location":"getting_started/rendering/#","page":"Rendering","title":"Rendering","text":"Next generate the image with global illumination.","category":"page"},{"location":"getting_started/rendering/#","page":"Rendering","title":"Rendering","text":"color_gillum = raytrace(origin, direction, scene, light, origin, 0)\n\nimg_gillum = get_image(color_gillum, screen_size...)","category":"page"},{"location":"getting_started/rendering/#","page":"Rendering","title":"Rendering","text":"The generated image should look like this:","category":"page"},{"location":"getting_started/rendering/#","page":"Rendering","title":"Rendering","text":"(Image: Global Illumination)","category":"page"},{"location":"getting_started/rendering/#Complete-Script-1","page":"Rendering","title":"Complete Script","text":"","category":"section"},{"location":"getting_started/rendering/#","page":"Rendering","title":"Rendering","text":"using RayTracer, Images\n\nscreen_size = (w = 512, h = 512)\n\nlight = PointLight(Vec3(1.0f0), 20000.0f0, Vec3(1.0f0, 5.0f0, -1.0f0))\n\ncam = Camera(Vec3(0.0f0, 0.35f0, -1.0f0), Vec3(1.0f0, 0.0f0, 1.0f0), Vec3(0.0f0, 1.0f0, 0.0f0),\n             45.0f0, 1.0f0, screen_size.w, screen_size.h)\n\nscene = [\n    SimpleSphere(Vec3(0.75f0, 0.1f0, 1.0f0), 0.6f0, color = rgb(0.0f0, 0.0f0, 1.0f0)),\n    SimpleSphere(Vec3(-0.75f0, 0.1f0, 2.25f0), 0.6f0, color = rgb(0.5f0, 0.223f0, 0.5f0)),\n    SimpleSphere(Vec3(-2.75f0, 0.1f0, 3.5f0), 0.6f0, color = rgb(1.0f0, 0.572f0, 0.184f0)),\n    CheckeredSphere(Vec3(0.0f0, -99999.5f0, 0.0f0), 99999.0f0,\n                    color1 = rgb(0.0f0, 1.0f0, 0.0f0),\n                    color2 = rgb(0.0f0, 0.0f0, 1.0f0), reflection = 0.25f0)\n    ]\n\norigin, direction = get_primary_rays(cam)\n\ncolor = raytrace(origin, direction, scene, light, origin, 0)\n\nimg = get_image(color, screen_size.w, screen_size.h)\n\nsave(\"spheres1.jpg\", img)","category":"page"},{"location":"getting_started/rendering/#Next-Steps-1","page":"Rendering","title":"Next Steps","text":"","category":"section"},{"location":"getting_started/rendering/#","page":"Rendering","title":"Rendering","text":"Look into the various objects supported by RayTracer\nGo to the examples/rendering directory for more examples\nTry out the inverse rendering examples (after all that is what this library is designed to do).","category":"page"},{"location":"getting_started/optimization/#Inverse-Rendering-1","page":"Inverse Rendering","title":"Inverse Rendering","text":"","category":"section"},{"location":"getting_started/optimization/#","page":"Inverse Rendering","title":"Inverse Rendering","text":"Work In Progress","category":"page"},{"location":"api/#API-Documentation-1","page":"API Documentation","title":"API Documentation","text":"","category":"section"},{"location":"api/#","page":"API Documentation","title":"API Documentation","text":"CurrentModule = RayTracer","category":"page"},{"location":"api/#General-Utilities-1","page":"API Documentation","title":"General Utilities","text":"","category":"section"},{"location":"api/#","page":"API Documentation","title":"API Documentation","text":"List of the General Functions and Types provided by the RayTracer. Most of the other functionalities are built upon these.","category":"page"},{"location":"api/#","page":"API Documentation","title":"API Documentation","text":"Modules = [RayTracer]\nPages = [\"utils.jl\",\n         \"imutils.jl\"]\nOrder = [:type,\n         :macro,\n         :function]","category":"page"},{"location":"api/#RayTracer.Vec3","page":"API Documentation","title":"RayTracer.Vec3","text":"This is the central type for RayTracer. All of the other types are defined building upon this.                                                      \n\nAll the fields of the Vec3 instance contains Arrays. This ensures that we can collect the gradients w.r.t the fields using the Params API of Zygote.\n\nDefined Operations for Vec3:\n\n+, -, * – These operations will be broadcasted even though there is no explicit                  mention of broadcasting.\ndot, l2norm\ncross\nclamp, clip01\nzero, similar, one\nplace\nmaximum, minimum\nsize\n\n\n\n\n\n","category":"type"},{"location":"api/#RayTracer.rgb","page":"API Documentation","title":"RayTracer.rgb","text":"rgb is an alias for Vec3. It makes more sense to use this while defining colors. \n\n\n\n\n\n","category":"type"},{"location":"api/#RayTracer.get_image-Union{Tuple{T}, Tuple{Vec3{T},Any,Any}} where T","page":"API Documentation","title":"RayTracer.get_image","text":"get_image(image, width, height)\n\nReshapes and normalizes a Vec3 color format to the RGB format of Images for easy loading, saving and visualization.\n\n\n\n\n\n","category":"method"},{"location":"api/#RayTracer.zeroonenorm-Tuple{Any}","page":"API Documentation","title":"RayTracer.zeroonenorm","text":"zeroonenorm(x::AbstractArray)\n\nNormalizes the elements of the array to values between 0 and 1. It is recommended to use ths function for doing this simple operation because the adjoint for this function is incorrect in Zygote.\n\n\n\n\n\n","category":"method"},{"location":"api/#RayTracer.FixedParams","page":"API Documentation","title":"RayTracer.FixedParams","text":"FixedParams\n\nAny subtype of FixedParams is not optimized using the update! API. For example, we don't want the screen size to be altered while inverse rendering, this is ensured by wrapping those parameters in a subtype of FixedParams.\n\n\n\n\n\n","category":"type"},{"location":"api/#RayTracer.@diffops-Tuple{Any}","page":"API Documentation","title":"RayTracer.@diffops","text":"@diffops MyType::DataType\n\nGenerates functions for performing gradient based optimizations on this custom type. 5 functions are generated.\n\nx::MyType + y::MyType – For Gradient Accumulation\nx::MyType - y::MyType – For Gradient Based Updates\nx::MyType * η<:Real – For Multiplication of the Learning Rate with Gradient\nη<:Real   * x::MyType – For Multiplication of the Learning Rate with Gradient\nx::MyType * y::MyType – Just for the sake of completeness.\n\nMost of these functions do not make semantic sense. For example, adding 2 PointLight instances do not make sense but in case both of them are gradients, it makes perfect sense to accumulate them in a third PointLight instance.\n\n\n\n\n\n","category":"macro"},{"location":"api/#RayTracer.bigmul-Tuple{Any}","page":"API Documentation","title":"RayTracer.bigmul","text":"bigmul(x)\n\nReturns the output same as typemax. However, in case gradients are computed, it will return the gradient to be 0 instead of nothing as in case of typemax.\n\n\n\n\n\n","category":"method"},{"location":"api/#RayTracer.extract-Union{Tuple{T}, Tuple{Any,T}} where T<:Number","page":"API Documentation","title":"RayTracer.extract","text":"extract(cond, x<:Number)\nextract(cond, x<:AbstractArray)\nextract(cond, x::Vec3)\n\nExtracts the elements of x (in case it is an array) for which the indices corresponding to the cond are true.\n\nnote: Note\nextract has a performance penalty when used on GPUs.\n\nExample:\n\njulia> a = rand(4)\n4-element Array{Float64,1}:\n 0.7201598586590607 \n 0.5829718552672327 \n 0.1177531256556108 \n 0.3083157590071375 \n\njulia> cond = a .> 0.5\n4-element BitArray{1}:\n  true\n  true\n false\n false\n\njulia> RayTracer.extract(cond, a)\n2-element Array{Float64,1}:\n 0.7201598586590607\n 0.5829718552672327\n\n\n\n\n\n","category":"method"},{"location":"api/#RayTracer.improcess-Tuple{Any,Any,Any}","page":"API Documentation","title":"RayTracer.improcess","text":"improcess(color_vector, width, height)\n\nNormalizes the Color Dimension and reshapes it to the given configuration.\n\n\n\n\n\n","category":"method"},{"location":"api/#RayTracer.place-Tuple{Vec3,Any}","page":"API Documentation","title":"RayTracer.place","text":"place(a::Vec3, cond)\n\nConstructs a new Vec3 with array length equal to that of cond filled with zeros. Then it fills the positions corresponding to the true values of cond with the values in a.\n\nThe length of each array in a must be equal to the number of true values in the  cond array.\n\n\n\n\n\n","category":"method"},{"location":"api/#","page":"API Documentation","title":"API Documentation","text":"get_params\nset_params!","category":"page"},{"location":"api/#RayTracer.get_params","page":"API Documentation","title":"RayTracer.get_params","text":"get_params(x)\n\nGet the parameters from a struct that can be tuned. The output is in the form of an array.\n\n\n\n\n\n","category":"function"},{"location":"api/#RayTracer.set_params!","page":"API Documentation","title":"RayTracer.set_params!","text":"set_params!(x, y::AbstractArray)\n\nSets the tunable parameters of the struct x. The index of the last element set into the struct is returned as output. This may be used to confirm that the size of the input array was as expected.\n\nExample\n\njulia> scene = Triangle(Vec3(-1.9, 1.3, 0.1), Vec3(1.2, 1.1, 0.3), Vec3(0.8, -1.2, -0.15),\n                    color = rgb(1.0, 1.0, 1.0), reflection = 0.5)\nTriangle{Array{Float64,1}}(Vec3{Array{Float64,1}}([-1.9], [1.3], [0.1]), Vec3{Array{Float64,1}}([1.2], [1.1], [0.3]), Vec3{Array{Float64,1}}([0.8], [-1.2], [-0.15]), RayTracer.Material{RayTracer.PlainColor,Float64}(RayTracer.PlainColor(Vec3{Array{Float64,1}}([1.0], [1.0], [1.0])), 0.5))\n\njulia> x = rand(13)\n13-element Array{Float64,1}:\n 0.39019817669623835\n 0.940810689314205\n .\n .\n .\n 0.5590307650917048\n 0.7551647340674075\n\njulia> RayTracer.set_params!(scene, x)\n13\n\n\n\n\n\n","category":"function"},{"location":"api/#Differentiation-1","page":"API Documentation","title":"Differentiation","text":"","category":"section"},{"location":"api/#","page":"API Documentation","title":"API Documentation","text":"The recommended mode of differentation is by Automatic Differentiation using Zygote. Refer to the Zygote docs for this. The API listed below is for numerical differentiation and is very restrictive in its current form.","category":"page"},{"location":"api/#","page":"API Documentation","title":"API Documentation","text":"ngradient\nnumderiv","category":"page"},{"location":"api/#RayTracer.ngradient","page":"API Documentation","title":"RayTracer.ngradient","text":"ngradient(f, xs::AbstractArray...)\n\nComputes the numerical gradients of f w.r.t xs. The function f must return a scalar value for this to work. This function is not meant for general usage as the value of the parameter δ has been tuned for this package specifically.\n\nAlso, it should be noted that these gradients are highly unstable and should be used only for confirming the values obtained through other methods. For meaningful results be sure to use Float64 as Float32 is too numerically unstable.\n\n\n\n\n\n","category":"function"},{"location":"api/#RayTracer.numderiv","page":"API Documentation","title":"RayTracer.numderiv","text":"numderiv(f, θ)\nnumderiv(f, θ::AbstractArray)\nnumderiv(f, θ::Real)\n\nCompute the numerical derivates wrt one of the scene parameters. The parameter passed cannot be enclosed in an Array, thus making this not a general method for differentiation.\n\nnote: Note\nThis is not a generalized method for getting the gradients. For that please use Zygote. However, this can be used to debug you model, incase you feel the gradients obtained by other methods is sketchy.\n\n\n\n\n\n","category":"function"},{"location":"api/#Scene-Configuration-1","page":"API Documentation","title":"Scene Configuration","text":"","category":"section"},{"location":"api/#Camera-1","page":"API Documentation","title":"Camera","text":"","category":"section"},{"location":"api/#","page":"API Documentation","title":"API Documentation","text":"Modules = [RayTracer]\nPages = [\"camera.jl\"]\nOrder = [:type,\n         :macro,\n         :function]","category":"page"},{"location":"api/#Light-1","page":"API Documentation","title":"Light","text":"","category":"section"},{"location":"api/#","page":"API Documentation","title":"API Documentation","text":"Modules = [RayTracer]\nPages = [\"light.jl\"]\nOrder = [:type,\n         :macro,\n         :function]","category":"page"},{"location":"api/#Materials-1","page":"API Documentation","title":"Materials","text":"","category":"section"},{"location":"api/#","page":"API Documentation","title":"API Documentation","text":"Modules = [RayTracer]\nPages = [\"material.jl\"]\nOrder = [:type,\n         :macro,\n         :function]","category":"page"},{"location":"api/#Objects-1","page":"API Documentation","title":"Objects","text":"","category":"section"},{"location":"api/#","page":"API Documentation","title":"API Documentation","text":"Modules = [RayTracer]\nPages = [\"sphere.jl\",\n         \"triangle.jl\",\n         \"cylinder.jl\",\n         \"disc.jl\",\n         \"polygon_mesh.jl\",\n         \"objects.jl\"]\nOrder = [:type,\n         :macro,\n         :function]","category":"page"},{"location":"api/#Renderers-1","page":"API Documentation","title":"Renderers","text":"","category":"section"},{"location":"api/#","page":"API Documentation","title":"API Documentation","text":"Modules = [RayTracer]\nPages = [\"blinnphong.jl\"]\nOrder = [:type,\n         :macro,\n         :function]","category":"page"},{"location":"api/#RayTracer.raytrace-Union{Tuple{L}, Tuple{Vec3,Vec3,Array{T,1} where T,L,Vec3}, Tuple{Vec3,Vec3,Array{T,1} where T,L,Vec3,Int64}} where L<:RayTracer.Light","page":"API Documentation","title":"RayTracer.raytrace","text":"raytrace(origin::Vec3, direction::Vec3, scene::Vector, lgt::Light, eye_pos::Vec3, bounce::Int)\nraytrace(origin::Vec3, direction::Vec3, scene::Vector, lgt::Vector{Light}, eye_pos::Vec3, bounce::Int)\n\nComputes the color contribution to every pixel by tracing every single ray. Internally it calls the light function which implements Blinn Phong Rendering and adds up the color contribution for each object.\n\nThe eye_pos is simply the origin when called by the user. However, the origin keeps changing across the recursive calls to this function and hence it is necessary to keep track of the eye_pos separately.\n\nThe bounce parameter allows the configuration of global illumination. To turn off global illumination set the bounce parameter to >= 2. As expected rendering is much faster if global illumination is off but at the same time is much less photorealistic.\n\nnote: Note\nThe support for multiple lights is primitive as we loop over the lights. Even though it is done in a parallel fashion, it is not the best way to do so. Nevertheless it exists just for the sake of experimentation.\n\n\n\n\n\n","category":"method"},{"location":"api/#RayTracer.light-Union{Tuple{L}, Tuple{S}, Tuple{S,Any,Any,Any,L,Any,Any,Any,Any}} where L<:RayTracer.Light where S<:RayTracer.Object","page":"API Documentation","title":"RayTracer.light","text":"light(s::Object, origin, direction, dist, lgt::Light, eye_pos, scene, obj_num, bounce)\n\nImplements the Blinn Phong rendering algorithm. This function is merely for internal usage and should in no case be called by the user. This function is quite general and supports user defined Objects. For support of custom Objects have a look at the examples.\n\n\n\n\n\n","category":"method"},{"location":"api/#Optimization-1","page":"API Documentation","title":"Optimization","text":"","category":"section"},{"location":"api/#","page":"API Documentation","title":"API Documentation","text":"Modules = [RayTracer]\nPages = [\"optimize.jl\"]\nOrder = [:type,\n         :macro,\n         :function]","category":"page"},{"location":"api/#RayTracer.update!-Tuple{Any,AbstractArray,AbstractArray}","page":"API Documentation","title":"RayTracer.update!","text":"update!(opt, x, Δ)\n\nProvides an interface to use all of the Optimizers provided by Flux. The type of x can be anything as long as the operations defined by @diffops are available for it. By default all the differentiable types inside the Package can be used with it.\n\nThe type of Δ must be same as that of x. This prevent silent type conversion of x which can significantly slow doen the raytracer.\n\nExample:\n\nopt = ADAM()\n\ngs = gradient(loss_function, θ)\n\nupdate!(opt, θ, gs[1])\n\n\n\n\n\n","category":"method"}]
}
