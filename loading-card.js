class LoadingCard extends HTMLElement{
    constructor() {
        super()
        this.resourceURL = this.getAttribute('resourceURL')
        this.img = document.createElement('img')
        this.state = {isLoading:true,x:0}
        const shadow = this.attachShadow({mode:'open'})
        shadow.appendChild(this.img)
    }
    drawBlocks(context,w,h) {
        context.fillRect(0,h/20,w,h/2-h/10)
        context.fillRect(0,h/2+h/20,w,h/15)
        context.fillRect(0,2*h/3,w,h/20)
    }
    renderLoadingCard() {
        const canvas = document.createElement('canvas')
        const w = window.innerWidth/3,h = w
        canvas.width = w
        canvas.height = w
        const context = canvas.getContext('2d')
        context.fillStyle = '#E0E0E0'
        context.fillRect(0,0,w,w)
        context.save()
        context.translate(w/10,w/10)
        context.fillStyle = 'white'
        this.drawBlocks(context,2*w/3,w)
        context.fillStyle = '#616161'
        context.save()
        context.translate(this.state.x,0)
        context.globalAlpha = 0.12
        context.beginPath()
        context.rect(0,0,2*w/3-w/10,w)
        context.clip()
        this.drawBlocks(context,w/20,w)
        context.restore()
        context.restore()
        this.img.src = canvas.toDataURL()
        this.state.x += w/15
        if(this.state.x >= 2*w/3-w/20) {
            this.state.x = 0
        }
    }
    drawCard(title,subtitle) {
        const canvas = document.createElement('canvas')
        const w = window.innerWidth/3,h = w
        const imgW = this.image.width,imgH = this.image.height
        canvas.width = w
        canvas.height = h
        const context = canvas.getContext('2d')
        context.fillStyle = '#E0E0E0'
        context.fillRect(0,0,w,w)
        context.save()
        context.translate(w/10,w/10)
        context.drawImage(this.image,0,h/20,2*w/3,(2*w/3)*imgH/imgW)
        context.fillStyle = 'black'
        context.font = context.font.replace(/\d{2}/,`${h/15}`)
        context.fillText(title,0,h/2+h/20+h/30)
        context.font = context.font.replace(/\d{2}/,`${h/20}`)
        context.fillText(subtitle,0,2*h/3+h/40)
        context.restore()
        console.log(canvas)
        this.img.src = canvas.toDataURL()

    }
    connectedCallback() {
        fetch(this.resourceURL).then((res)=>{
            return res.json()
        }).then((data)=>{
            console.log(data)

            this.image = new Image()
            this.image.src = data.img
            this.image.onload = ()=>{
                this.state.isLoading = false
                setTimeout(()=>{
                  this.drawCard(data.title,data.subtitle)
                },100)
            }
        }).catch((err)=>{
            console.log(err)
        })
        const interval = setInterval(()=>{
            if(this.state.isLoading == true) {

                this.renderLoadingCard()
            }
            else {
                clearInterval(interval)
            }
        },100)
    }
}
customElements.define('loading-card',LoadingCard)
