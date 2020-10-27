import adkesma from 'assets/adkesma.png'
import akpem from 'assets/akpem.png'
import bismit from 'assets/bismit.png'
import depor from 'assets/depor.png'
import humas from 'assets/humas.png'
import kastrat from 'assets/kastrat.png'
import kestari from 'assets/kestari.png'
import ki from 'assets/ki.png'
import media from 'assets/media.png'
import keilmuan from 'assets/keilmuan.png'
import pengmas from 'assets/pengmas.png'
import pi from 'assets/pi.png'
import psdm from 'assets/psdm.png'
import pti from 'assets/pti.png'
import senbud from 'assets/senbud.png'

export default function generateLogoByRequester(department) {
  const birdept = department.toLowerCase()
  const logoMap = {
    adkesma: adkesma,
    akpem: akpem,
    bismit: bismit,
    depor: depor,
    humas: humas,
    kastrat: kastrat,
    kestari: kestari,
    ki: ki,
    media: media,
    keilmuan: keilmuan,
    pengmas: pengmas,
    pi: pi,
    psdm: psdm,
    pti: pti,
    senbud: senbud,
  }
  return logoMap[birdept]
}
